class Industry < ActiveRecord::Base

	translates :name

	belongs_to :user

	has_many :branches, dependent: :destroy

    has_many :customers, dependent: :destroy

	belongs_to :rating_type

	scope :sort , -> { order(name: :asc )}
     
    has_one :image, as: :imageable 
    

	def self.get_tree(industry)
        tree_structure=[]
        industry.each do |k|
        	dep_count = 0
            user_count = 0
        	k.branches.map{|h|  
                  dep_count = dep_count + h.departments.count;
                   h.departments.each{|h| h.user.present? ? user_count= user_count + 1 : user_count = user_count}
            }

        	tree_structure <<  {'id'=> k.id,'name'=> k.name,'industry_type' => k.industry_type, "no_of_branch" => k.branches.count,"no_of_department"=> dep_count, "no_of_user" => user_count, avatar:  k.image }
        end	
		tree_structure
	end	

end

 