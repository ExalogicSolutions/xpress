class SubDepartment < ActiveRecord::Base

	belongs_to :user

	belongs_to :department

	has_one :personal_detail, dependent: :destroy

	has_many :feedback_questions, dependent: :destroy

    has_many :feedback_answers, dependent: :destroy

    has_one :image, as: :imageable 

    def self.sub_department_list_tree(department)
    	tree_structure =[]
    	 department.sub_departments.each do |k|
    	 	if k.user
    	      tree_structure   <<  {'id'=> k.id, 'name'=> k.personal_detail.name, 'head_user' => {'id'=> k.user.id, 'name'=> (k.user.first_name+ " " + k.user.last_name)} }  
            else
              tree_structure   <<  {'id'=> k.id, 'name'=> k.personal_detail.name, 'head_user' => {} }   	
            end	
        end
        tree_structure
    end
	def sub_department_name
		self.personal_detail.name
	end


end
