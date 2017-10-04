class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable

	devise :database_authenticatable, :registerable,
		:recoverable, :rememberable, :trackable, :validatable

	has_many :industries, dependent: :destroy

	has_one :branch

	has_one :department

	has_one :sub_department

	has_one :personal_detail, dependent: :destroy

	mount_uploader :avatar, HeadAvatarUploader

	scope :active , -> {where(status: true)}

	def fetch_industry(user)
		Industry.find(Staff.find_by(user_id: user.id).industry_id)
	end

	def fetch_branch(user)
		Branch.find(Staff.find_by(user_id: user.id).branch_id)
	end

	def fetch_department(user)
		department_id=Staff.find_by(user_id: user.id).department_id
		if department_id.present?
			Department.find(department_id)
		end
	end

	def fetch_sub_department(user)
		sub_department_id=Staff.find_by(user_id: user.id).sub_department_id
		if sub_department_id.present?
			SubDepartment.find(sub_department_id)
		end
	end

	def active_for_authentication?
        super && self.status # i.e. super && self.is_active
    end

	def fetch_user_type(user)
		if user.user_type == "admin"
			return I18n.t('user.admin')
		elsif user.user_type == "branch_head"
			return I18n.t('user.branch_head')
		elsif user.user_type == "department_head"
			return I18n.t('user.department_head')
		elsif user.user_type == "sub_department_head"
			return I18n.t('user.sub_department_head')
		else
			return I18n.t('user.not_assigned')
		end
	end

	def self.drop_filter_module(current_user)
		industries = {}
		branches = {}
		departments = {}
		sub_departments = {}
		case current_user.user_type
			when ADMIN
				current_user.industries.each {|i| industries[i.name] = i.id}
				current_user.industries.each {|i| i.branches.each {|b| branches[b.personal_detail.name]= b.id}}
				current_user.industries.each {|i| i.branches.each {|b| b.departments.each {|d| departments[d.personal_detail.name] = d.id}}}
				industry_id = nil
				branch_id = nil
				department_id = nil
				sub_department_id = nil
			when BRANCH_HEAD
				current_user.branch.departments.each {|d| departments[d.personal_detail.name]= d.id}
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
				current_user.department.sub_departments.each {|h| sub_departments[h.personal_detail.name]= h.id}                     
				industry_id = current_user.department.branch.industry.id
				branch_id = current_user.department.branch.id 
				department_id = current_user.department.id   
				sub_department_id = nil
			when SUB_DEPARTMENT_HEAD
				industries[current_user.sub_department.department.branch.industry.name] = current_user.sub_department.department.branch.industry.id
				branches[current_user.sub_department.department.branch.personal_detail.name] = current_user.sub_department.department.branch.id
				departments[current_user.sub_department.department.personal_detail.name] = current_user.sub_department.department.id
				sub_departments[current_user.sub_department.personal_detail.name] = current_user.sub_department.id
				industry_id = current_user.sub_department.department.branch.industry.id
				branch_id = current_user.sub_department.department.branch.id 
				department_id = current_user.sub_department.department.id
				sub_department_id = current_user.sub_department.id
		end
		return industries, branches, departments, sub_departments, industry_id, branch_id, department_id, sub_department_id
	end

	def self.get_notifaction_alert(current_user,set_time)
		date_time = DateTime.now
        industry_id = []
        user_id = []
        branch_id = []
        department_id =[]
        sub_department_id =[]
        feedbackquestion = []
        current_user.industries.each{ |h|
          industry_id << h.id
          h.branches.each {|k|
            branch_id << k.id
            user_id << k.user.id if k.user
            k.feedback_questions.where(status: nil).each { |f| feedbackquestion << f}
            k.departments.each{|j|
               department_id << j.id
               j.feedback_questions.where(status: nil).each { |f| feedbackquestion << f}
               user_id << j.user.id if j.user
               j.sub_departments.each{|l|
                   l.feedback_questions.where(status: nil).each { |f| feedbackquestion << f}
                   sub_department_id << l.id   
                   user_id << l.user.id if l.user
               } 
            }
          }

        }
        pd_branch = PersonalDetail.where(:updated_at => set_time.to_datetime..date_time, branch_id: branch_id)
        pd_department = PersonalDetail.where(:updated_at => set_time.to_datetime..date_time, department_id: department_id)
        pd_sub_department = PersonalDetail.where(:updated_at => set_time.to_datetime..date_time, sub_department_id: sub_department_id)
        pd_user = PersonalDetail.where(:updated_at => set_time.to_datetime..date_time, user_id: user_id)
        pd = pd_branch + pd_department + pd_sub_department + pd_user

        return pd, feedbackquestion
	end	

end
