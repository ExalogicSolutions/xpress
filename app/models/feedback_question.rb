class FeedbackQuestion < ActiveRecord::Base

	translates :question

	belongs_to :branch

	belongs_to :department

	belongs_to :sub_department

    belongs_to :item

	has_many :feedback_answers, dependent: :destroy
    has_one :customer_feedback_question 
	def self.get_feedback_question_tree(current_user)
		  tree_structure=[]
      temp ={}   
     case current_user.user_type
     when ADMIN
          current_user.industries.each do |k|
            branch_qes = 0
            dep_ques = 0
            sub_ques = 0
            branch_obj = []
            rest_obj ={}
            k.branches.each{|h|  
                branch_qes =  h.feedback_questions.count;       
                     h.departments.each{|h| h.feedback_questions.present? ? dep_ques= dep_ques+ h.feedback_questions.count : dep_ques = dep_ques ;
                            h.sub_departments.each {|h| h.feedback_questions.present? ? sub_ques= sub_ques+h.feedback_questions.count : sub_ques = sub_ques}
                     }
             branch_obj = {'branch_id'=> h.id, 'branch_name' => h.personal_detail.name,"no_of_branch_question" => branch_qes, 'avatar' => h.image}
             rest_obj = {'id'=> k.id,'name'=> k.name,'industry_type' => k.industry_type, "no_of_department_question"=> dep_ques, "no_of_sub_department_question" => sub_ques}
             new_obj = rest_obj.merge(branch_obj) 
             tree_structure <<  new_obj
             dep_ques = 0
             sub_ques = 0
            }
          #rest_obj = {'id'=> k.id,'name'=> k.name,'industry_type' => k.industry_type, "no_of_department_question"=> dep_ques, "no_of_sub_department_question" => sub_ques}
          
          
                dep_ques = 0
                sub_ques = 0 
                branch_obj = []
                rest_obj ={}
        end 
    when BRANCH_HEAD
          branch = [] << current_user.branch
          branch.each do |k|
            dep_ques = 0
            sub_ques = 0
            k.departments.each{|h| h.feedback_questions.present? ? dep_ques= dep_ques +h.feedback_questions.count : dep_ques = dep_ques ;
                          h.sub_departments.each {|h| h.feedback_questions.present? ? sub_ques= sub_ques+h.feedback_questions.count  : sub_ques = sub_ques}
            }
               tree_structure <<  {'id'=> k.industry.id,'name'=> k.industry.name,'industry_type' => k.industry.industry_type, 'branch_id'=> k.id, 'branch_name' => k.personal_detail.name,"no_of_branch_question" => k.feedback_questions.count,"no_of_department_question"=> dep_ques, "no_of_sub_department_question" => sub_ques, 'avatar' => k.image}
                dep_ques = 0
                sub_ques = 0
         end 
    when DEPARTMENT_HEAD 
         department = [] << current_user.department
          department.each do |k|
            dep_ques = 0
            sub_ques = 0
            k.sub_departments.each {|h| h.feedback_questions.present? ? sub_ques= sub_ques+h.feedback_questions.count : sub_ques = sub_ques}
            tree_structure <<  {'id'=> k.branch.industry.id,'name'=> k.branch.industry.name,'industry_type' => k.branch.industry.industry_type, 'branch_id'=> k.branch.id, 'branch_name' => k.branch.personal_detail.name,"department_id" => k.id,"department_name" => k.personal_detail.name,"no_of_department_question"=> k.feedback_questions.count, "no_of_sub_department_question" => sub_ques, 'avatar' => k.image}
                dep_ques = 0
                sub_ques = 0
         end 
    when SUB_DEPARTMENT_HEAD
         sub_department = [] << current_user.sub_department
             sub_department.each do |k|
              tree_structure <<  {'id'=> k.department.branch.industry.id,'name'=> k.department.branch.industry.name,'industry_type' => k.department.branch.industry.industry_type, 'branch_id'=> k.department.branch.id, 'branch_name' => k.department.branch.personal_detail.name,"department_id" => k.department.id,"department_name" => k.department.personal_detail.name,"sub_department_id" => k.id,"sub_department_name" => k.personal_detail.name ,"no_of_sub_department_question" => k.feedback_questions.count, 'avatar' => k.image}
             end      
    end  

        tree_structure
	end	

  def self.get_department_question(current_user_type,current_head)
     department_question = []
     temp = []
     fb = []
     case current_user_type
     # when ADMIN 
     #  branch_temp = []
     #       current_head.each{ |h|
     #          h.branches.each{ |k|
     #             k.departments.each{ |d|  
     #                  d.feedback_questions.each {|f|  fb << {'id' => f.id, 'question' => f.question, 'department_id' => f.department_id,'priority' => f.priority, 'status' => f.status
     #                   }}            
     #              temp << {'id' => d.id, 'name' => d.personal_detail.name, 'feedback_questions' => fb}} 
     #             branch_temp  << {'id' => k.id, 'name' => k.personal_detail.name, 'departments' => temp}
     #             temp =[]
     #             fb=[]
     #          }
     #        department_question << {'id' => h.id , 'name' => h.name, 'branches' => branch_temp}
     #        branch_temp =[]
     #       }
     when ADMIN,BRANCH_HEAD
            if current_user_type == ADMIN
               branch = [] << current_head
               industry = current_head.industry
            else
               branch = [] << current_head.branch
               industry = current_head.branch.industry
            end  
           
           
             branch.each { |b|
                 b.departments.each{ |d|  
                      d.feedback_questions.each {|f|  
                        fb << {'id' => f.id, 'question' => f.question, 'department_id' => f.department_id,'priority' => f.priority, 'status' => f.status, 'fq_enabled' => f.fq_enabled}
                        
                      }
                      temp << {'id' => d.id, 'name' => d.personal_detail.name, 'feedback_questions' => fb} 
                      fb=[]
                    }        
                  department_question << {'id' => industry.id , 'name' => industry .name, 'branches' => [{'id' => b.id, 'name' => b.personal_detail.name, 'departments' => temp}]}
                  
                  temp =[]
                 fb=[]
             }
     when DEPARTMENT_HEAD
            department_head = [] << current_head.department
            branch = current_head.department.branch 
            industry = current_head.department.branch.industry
            department_head.each{ |d|  
                  d.feedback_questions.each {|f|  fb << {'id' => f.id, 'question' => f.question, 'department_id' => f.department_id,'priority' => f.priority, 'status' => f.status, 'fq_enabled' => f.fq_enabled}
            }
            department_question << {'id' => industry.id , 'name' => industry .name, 'branches' => [{'id' => branch.id, 'name' => branch.personal_detail.name, 'departments' => [{'id' => d.id, 'name' => d.personal_detail.name, 'feedback_questions' => fb}] } ]}    
            fb=[]
          }  

     end 
  
     department_question
  end

  def self.drop_filter_module(current_user)
    industries = {}
    branches = {}
    departments = {}
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
	
   def self.get_all_question(branch)
    all_branch_feedback_question = []
    branch_feedback_question = branch.feedback_questions
    department_feedback_question = []
    branch.departments.each {|h| h.feedback_questions.each {|k|  department_feedback_question << k} }
    sub_department_feedback_question = []
    branch.departments.each { |d| d.sub_departments.each {|h| h.feedback_questions.each {|k|  sub_department_feedback_question << k} }} 
    branch_feedback_question.zip(department_feedback_question, sub_department_feedback_question) { |x, y, z| all_branch_feedback_question << [x, y, z] }
    high_priority = all_branch_feedback_question.each{|k|  k.select {|a|  a.priority == HIGH if a}}
    diff_question = high_priority.count - FIFTHEEN
    if diff_question < 0
        diff_pluck = all_branch_feedback_question.map{|k|  k.select {|a|  [MEDIUM,LOW].include?(a.priority) if a}}.sample(diff_question.abs)
    end  
    high_priority = high_priority.concat diff_pluck
    return high_priority
   end 


  def self.get_id(id, list, user_type)
    fbq_detail = FeedbackQuestion.find_by_id(id)
    case user_type
    when "branch"
         branch = fbq_detail.branch
    when "department"
         branch = fbq_detail.department.branch
    when "sub_department"
         branch = fbq_detail.sub_department.department.branch
    end
    if user_type != "menu" 
        if list == 'create' && (branch.customer_feedback_questions.count < branch.no_of_fbq )
         CustomerFeedbackQuestion.create(feedback_question_id: id, branch_id: branch.id)
         fbq_detail.update(fq_enabled: true)
        elsif list == 'delete'
        
          CustomerFeedbackQuestion.find_by_feedback_question_id(id).delete
          fbq_detail.update(fq_enabled: false)  
        else
          error = "You Have exceeded your limit of question"
        end 
    else
      list == "create" ?  fbq_detail.update(fq_enabled: true) :  fbq_detail.update(fq_enabled: false)
    end    
    return fbq_detail, error
  end

end 
 