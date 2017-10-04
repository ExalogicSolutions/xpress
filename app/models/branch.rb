class Branch < ActiveRecord::Base

	belongs_to :user

	belongs_to :industry

	has_one :personal_detail, dependent: :destroy

	has_many :departments, dependent: :destroy

	has_many :feedback_questions, dependent: :destroy

	has_many :feedback_answers, dependent: :destroy

	has_one :image, as: :imageable 

    has_many :customer_feedback_questions 
    
	def branch_name
		self.personal_detail.name
	end	
	# def self.get_branches_tree(branch)
	# 	tree_structure=[]
 #        temp={}
	# 	 branch.each do |k|
	# 	 	department =[]
	# 		  k.departments.each do |s|
	# 	           department << {'id' => s.id, 'name' => s.personal_detail.name, 'department_contact' => s.personal_detail.contact_number,'department_user' => s.user  }
	# 	        end 
	# 	 temp['branch'] = {'id'=> k.id, 'name'=> k.personal_detail.name,'department' => department}         
	# 	 tree_structure << temp
	# 	 temp={}
	# 	end
	# 	tree_structure

	# end
   
   def self.get_tree(branch)
          tree_structure=[]
        branch.each do |k|
        	dep_count = 0
            user_count = 0
                   k.departments.each{|h| h.user.present? ? user_count= user_count + 1 : user_count = user_count}
        	tree_structure <<  {'id'=> k.industry.id,'name'=> k.industry.name,'industry_type' => k.industry.industry_type,"branch_name" => k.personal_detail.name,"no_of_department"=> k.departments.count, "no_of_user" => user_count, avatar: k.industry.image}
        end	
		tree_structure
   end
end
