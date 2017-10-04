class Menu < ActiveRecord::Base

	belongs_to :department
	
	has_many :categories, dependent: :destroy

	accepts_nested_attributes_for :categories , reject_if: lambda { |a| a[:name].blank? }, allow_destroy: true

	def self.get_drop_down(type, industry_id, branch_id, department_id)
		industries={}
        branches={}
        departments={}
		case type
        when ADMIN        
             Industry.all.each {|h| industries[h.name]= h.id }                   
             Branch.where(industry_id: industry_id).each {|h| branches[h.personal_detail.name]= h.id }    
             Department.where(branch_id: branch_id).each {|h| departments[h.personal_detail.name]= h.id }       
        when BRANCH_HEAD         
             Industry.where(id: industry_id).each {|h| industries[h.name]= h.id }
             Branch.where(id: branch_id).each {|h| branches[h.personal_detail.name]= h.id }
             Department.where(branch_id: branch_id).each {|h| departments[h.personal_detail.name]= h.id }       
        when DEPARTMENT_HEAD          
             Industry.where(id: industry_id).each {|h| industries[h.name]= h.id } 
             Branch.where(id: branch_id).each {|h| branches[h.personal_detail.name]= h.id } 
             Department.where(id: department_id).each {|h| departments[h.personal_detail.name]= h.id }
       end  
       return industries, branches, departments
	end	

  def self.drop_filter_module(current_user)
    industries = {}
    branches = {}
    departments = {}
    categories={}
    sub_departments = {}
    case current_user.user_type
      when ADMIN
        current_user.industries.each {|i| industries[i.name]= i.id}
        current_user.industries.each {|i| i.branches.each {|b| branches[b.personal_detail.name]= b.id}}
        current_user.industries.each {|i| i.branches.each {|b| b.departments.each {|d| departments[d.personal_detail.name] = d.id}}}
        industry_id = nil
        branch_id = nil
        department_id = nil
        sub_department_id = nil
      when BRANCH_HEAD
        current_user.branch.departments.each {|h| departments[h.personal_detail.name]= h.id}
        industries[current_user.branch.industry.name] = current_user.branch.industry.id
        branches[current_user.branch.personal_detail.name] = current_user.branch.id 
        industry_id = current_user.branch.industry.id
        branch_id = current_user.branch.id
        department_id = nil
        sub_department_id = nil
      when DEPARTMENT_HEAD
        industries[current_user.department.branch.industry.name] = current_user.department.branch.industry.id
        branches[current_user.department.branch.personal_detail.name] = current_user.department.branch.id
        departments[current_user.department.personal_detail.name] = current_user.department.id
        current_user.department.menus.first.categories.each {|c| categories[c.name]=c.id}
        current_user.department.sub_departments.each {|h| sub_departments[h.personal_detail.name]= h.id}                     
        industry_id = current_user.department.branch.industry.id
        branch_id = current_user.department.branch.id 
        department_id = current_user.department.id   
        sub_department_id = nil
      when SUB_DEPARTMENT_HEAD
        industries[current_user.sub_department.department.branch.industry.name] = current_user.sub_department.department.branch.industry.id
        branches[current_user.sub_department.department.branch.personal_detail.name] = current_user.sub_department.department.branch.id
        departments[current_user.sub_department.department.personal_detail.name] = current_user.sub_department.department.id
        current_user.sub_department.department.menus.first.categories.each {|c| categories[c.name]=c.id}
        sub_departments[current_user.sub_department.personal_detail.name] = current_user.sub_department.id
        industry_id = current_user.sub_department.department.branch.industry.id
        branch_id = current_user.sub_department.department.branch.id 
        department_id = current_user.sub_department.department.id
        sub_department_id = current_user.sub_department.id
    end
    return industries, branches, departments, categories, sub_departments, industry_id, branch_id, department_id, sub_department_id  
  end

    def self.get_menu_list(current_user)
     menu = [] 
     case current_user.user_type
        when ADMIN
            current_user.industries.each { |i|  i.branches.each{ |b| b.departments.each{ |d| menu << d.menus}}}
        when BRANCH_HEAD
             current_user.branch.departments.each{ |d| menu << d.menus }
        when DEPARTMENT_HEAD
             menu = current_user.department.menus
        when SUB_DEPARTMENT_HEAD
              menu = current_user.sub_department.department.menus 
       end
     return menu
    end	


end
