
class ReportsController < ApplicationController
  skip_before_filter :verify_authenticity_token, :only => :submit_feedback_answers
  def home
  	@user = current_user 
  	if current_user.user_type == GUEST_USER
  	 @branch = Branch.find_by_id(@user.guest_branch_id)
  	 @selected_feedback_question = []
  	 # all_feedback_question = FeedbackQuestion.get_all_question(@branch) 	
  	 # all_feedback_question = all_feedback_question.sample(15)
  	 # all_feedback_question = all_feedback_question.flatten.compact
    #  all_feedback_question.each_slice(FIVE) {|a| @selected_feedback_question << a}
     @selected_feedback_question = @branch.customer_feedback_questions.includes(:feedback_question)

     @selected_feedback_question = @selected_feedback_question.each_slice(5).to_a

     @rating_type = @branch.industry.rating_type.name
      menu_id = []
      @branch.departments.map{ |h| menu_id << h.menus.pluck(:id) if h.menus}
      menu_id = menu_id.flatten
      
      @category = Category.where(menu_id: menu_id )
  	end
  	case @user.user_type
      	when ADMIN
        	@industries = @user.industries
        	@user_lists = User.where(id:  Staff.where("industry_id in (?)",@user.industries.pluck(:id)).pluck(:user_id))
       	when BRANCH_HEAD
        	branch_id = @user.branch.id
          	@user_lists = User.where(id:  Staff.where("branch_id = ? and user_id != ?", branch_id,@user.id).pluck(:user_id))
        when DEPARTMENT_HEAD
          	department_id = @user.department.id
          	@user_lists = User.where(id:  Staff.where("department_id = ? and user_id != ? ", department_id,@user.id).pluck(:user_id))
        when SUB_DEPARTMENT_HEAD
          	sub_department_id = @user.sub_department.id
          	@user_lists = User.where(id:  Staff.where("sub_department_id = ? and user_id != ? ", sub_department_id,@user.id).pluck(:user_id))
    end

  end


    def get_list_fbq
     
     @user = current_user 
     @branch = Branch.find_by_id(@user.guest_branch_id)
     @selected_feedback_question = []
     @item_feedbackquestion = Item.get_fbq_item(params['items_ids'])
     @item_feedbackquestion = @item_feedbackquestion.where("feedback_questions.fq_enabled = true").references(:feedback_questions)
     @item_feedbackquestion = @item_feedbackquestion.each_slice(5).to_a
       
    
     @selected_feedback_question = @branch.customer_feedback_questions.includes(:feedback_question)

     @selected_feedback_question = @selected_feedback_question.each_slice(5).to_a

     @rating_type = @branch.industry.rating_type.name
      menu_id = []
      @branch.departments.map{ |h| menu_id << h.menus.pluck(:id) if h.menus}
      menu_id = menu_id.flatten
      
      @category = Category.where(menu_id: menu_id )
      
  end 






   def submit_feedback_answers
    rating_value = JSON.parse(params[:rating_value])    
    customer = Customer.create(email: params[:email])
    rating_value.each do |key, value|
      FeedbackQuestion.find_by_id(key).feedback_answers.create(answer: value,customer_id: customer.id)
    end
    if params[:comment] 
      FeedbackAnswer.create(customer_id: customer.id,comment: params[:comment])
    end
    if PersonalDetail.create(name: params[:name], gender: params[:gender], contact_number: params[:contact_number],customer_id: customer.id)
    	flash[:success] = "Thanks for giving feedback"
    else	
        flash[:error] = "Something went wrong. Please try again"
    end	
    redirect_to authenticated_root_path
  end  
end
