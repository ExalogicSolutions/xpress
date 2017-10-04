class Department < ActiveRecord::Base

	belongs_to :user

	belongs_to :branch

	has_one :personal_detail, dependent: :destroy

	has_many :sub_departments, dependent: :destroy

	has_many :feedback_questions, dependent: :destroy

	has_many :feedback_answers, dependent: :destroy

	has_many :menus, dependent: :destroy

	mount_uploader :avatar, AvatarUploader
	has_one :image, as: :imageable 
    
    def self.department_list_tree(department)
    	temp ={}
    	temp['department'] = {'id' => department.id,'avatar' => department.image,'personal_details' => department.personal_detail.as_json, 'branch'=> {'branch_detail' => department.branch.as_json, 'branch_profile' => department.branch.personal_detail.as_json }, 'department_head_details'=> {'user' => department.user,"user_detail"=> department.user.personal_detail.as_json, 'avatar' => department.user.avatar}}
    end	
    
    

	def department_name
		self.personal_detail.name
	end

	def self.get_view_details(current_user, list_branch)
		case current_user.user_type
		when ADMIN
			 industry_name = list_branch.name
             branch =  list_branch.branches
		when BRANCH_HEAD
			branch = [] << current_user.branch
			industry_name = current_user.branch.industry.name		
		end	
		tree_structure=[]
	        temp={}
			 branch.each do |k|
			 	department =[]
				  k.departments.each do |s|
			           department << {'id' => s.id, 'name' => s.personal_detail.name, 'department_contact' => s.personal_detail.contact_number,'department_user' => s.user  }
			        end 
			 temp['branch'] = {'id'=> k.id, 'name'=> k.personal_detail.name,'department' => department}         
			 tree_structure << temp
			 temp={}
		    end
		
		return tree_structure, industry_name
	end	

end
