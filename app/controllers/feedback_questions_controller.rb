class FeedbackQuestionsController < ApplicationController
  
  before_action :set_feedback_question, only: [:edit, :get_feedback_question, :destroy, :delete_fbq_item,:update_fbq_item,:edit_fbq_item]
  def index
      @tree = FeedbackQuestion.get_feedback_question_tree(current_user)
      @user_type = current_user.user_type
      if @user_type == ADMIN
        @industries = current_user.industries
      end
  end

  def new
    @question_for = params[:question_for]
    @industries={}
    @branches={}
    @departments={}
    @sub_departments={}
    @industries, @branches, @departments, @sub_departments, @industry_id, @branch_id, @department_id, @sub_department_id  = FeedbackQuestion.drop_filter_module(current_user)
  end

  def create
    if params[:questions]
      if [ADMIN, BRANCH_HEAD].include?(current_user.user_type)
       status = true
      else
        status = nil
      end 
      if !params[:sub_department_id].nil?
        params[:department_id]=nil
        params[:branch_id]=nil
      end 
      params[:questions].each do |k,v|
        fbq = FeedbackQuestion.create(question: v, priority: params[:radio][k], branch_id: params[:branch_id], department_id: params[:department_id], sub_department_id: params[:sub_department_id], status: status)
      end
    end
    flash[:success] = "Questions created Successfully!"
    redirect_to feedback_questions_path
  end
  
  def create_item_fbq
          if [ADMIN, BRANCH_HEAD].include?(current_user.user_type)
       status = true
      else
        status = nil
      end 
    params[:questions].each do |k,v|
        fbq = FeedbackQuestion.create(question: v, priority: params[:radio][k], item_id: params['item_id'], status: status)
    end
    redirect_to menus_path
  end
  
  def edit_fbq_item   
      
     if params['module'] == "edit" 
        return render partial: "edit_fbq_item"
      elsif params['module'] == "delete"
        return render partial: "delete_fbq_item"
     end
  end

  def update_fbq_item
        if [ADMIN, BRANCH_HEAD].include?(current_user.user_type)
     status = params[:status]
    else
      status = nil
    end  
      @feedback_question.update(question: params[:question], priority: params[:priority], status: status)  
       @item_list =  Item.get_fbq_item(params['id'])
       @id = params['id']

  end

  def delete_fbq_item
     @feedback_question.delete
  end
  def edit
    return render partial: "edit"
  end

  def update
    if [ADMIN, BRANCH_HEAD].include?(current_user.user_type)
     status = params[:status]
    else
      status = nil
    end  
    feedback_question = FeedbackQuestion.find_by(id: params[:id]).update(question: params[:question], priority: params[:priority], branch_id: params[:branch_id], department_id: params[:department_id], sub_department_id: params[:sub_department_id], status: status)
    if feedback_question
      flash[:success] = "Branch Feedback Question updated Successfully!"
      redirect_to feedback_questions_path
    else
      flash[:error] = "Something went wrong!"
      redirect_to :back
    end
  end

  def show
  end

  def filter_branch_by_industry
    @branches ={}
    Branch.where(industry_id: params[:id]).each {|h| @branches[h.personal_detail.name]= h.id }
    return render partial: "feedback_questions/branch_drop_down"
  end

  def filter_department
    @departments={}
    Department.where(branch_id: params[:id]).each {|h| @departments[h.personal_detail.name]= h.id }
    return render partial: "department_drop_down"
  end

  def filter_sub_department
    @sub_departments={}
    SubDepartment.where(department_id: params[:id]).each {|h| @sub_departments[h.personal_detail.name]= h.id }
    return render partial: "sub_department_drop_down"
  end

  def list_branch_feedback_questions
    @branch = Branch.find(params[:id])
    @feedback_questions = @branch.feedback_questions
    return render partial: 'branch_feedback_questions'
  end

  def list_sub_department_feedback_questions
    case current_user.user_type
      when DEPARTMENT_HEAD
        @department=Department.find(params[:id])
        return render partial: 'sub_department_feedback_questions_by_department_head'
      when SUB_DEPARTMENT_HEAD
        @sub_department = SubDepartment.find(params[:id])
        return render partial: 'sub_department_feedback_questions_by_sub_department_head'
      when ADMIN,BRANCH_HEAD
        @branch = Branch.find(params[:id])
        return render partial: 'sub_department_feedback_questions_by_admin_branch_head'
    end        
  end

  def get_feedback_question
    if params['edit_question'].present?
      return render partial: "edit_department_feedback_question"
    else  
      return render partial: "delete"
    end
  end

  def destroy
  if @feedback_question.destroy 
    CustomerFeedbackQuestion.find_by_feedback_question_id(@feedback_question.id).delete if  CustomerFeedbackQuestion.find_by_feedback_question_id(@feedback_question.id)
    flash[:success] = "Feedback Question deleted Successfully!"
   
  else
    flash[:error] = "Something went wrong!"
      
  end
 end
  
  def list_department_feedback_questions     
    case current_user.user_type
      when ADMIN
        current_head = Branch.find_by_id(params[:id]) 
      when BRANCH_HEAD, DEPARTMENT_HEAD
        current_head = current_user     
    end          
    @feedback_question = FeedbackQuestion.get_department_question(current_user.user_type, current_head)       
    return render partial: 'department_feedback_question'
  end 

  def edit_department_fbq
      if [ADMIN, BRANCH_HEAD].include?(current_user.user_type)
        status = params[:status]
      else
        status = nil
      end   
      feedback_question = FeedbackQuestion.find_by_id(params[:format]).update(:question => params[:question], :priority => params[:priority], :status => status)
      if feedback_question
        flash[:success] = "Department Feedback Question updated Successfully!"
        redirect_to feedback_questions_path
      else
        flash[:error] = "Something went wrong!"
        redirect_to :back
      end
  end  
  
  def get_status_approved
       @pending_question = FeedbackQuestion.where("id IN(?)", params[:id]).map{|h| h.question}
       @pending_ids = params[:id]
       return render partial: "approved_dept_status"
  end  
  
  def approved_status
     params[:format].split(',').each { |h| FeedbackQuestion.find_by_id(h).update(:status => true)}
     #  flash[:success] = "Feedback Question Status ApprovedSuccessfully!"
     # redirect_to feedback_questions_pat
  end  

  def customer_feedback_question
   fbq_detail, error = FeedbackQuestion.get_id(params[:id], params['list'], params['mod'])
    if error.present?
      @error = error
       @stat = false
    else
      @error = ""
      @stat = true
    end
      case params[:mod]
      when "branch"
           render partial: "list_customer_feedback_question", :locals => { :fbq => fbq_detail, :error => @error}  
      when "department"
            fbq_detail = {"id" => fbq_detail.id, "question" => fbq_detail.question,'department_id' => fbq_detail.department_id, 'priority' => fbq_detail.priority, 'status' => fbq_detail.status,'fq_enabled' => fbq_detail.fq_enabled}
           render partial: "department_customer_feedback_question", :locals => { :fbq => fbq_detail, :error => @error}
      when "sub_department" 
           render partial: "sub_department_customer_feedback_question", :locals => { :fbq => fbq_detail, :error => @error}
      when "menu"     
           render partial: "menu_customer_feedback_question", :locals => { :fbq => fbq_detail, :error => @error}
      end
          
      
  end
  

  def show_item_question
     # @item_id = Customer.find_by_id(params['id'])
     @item_list =  Item.get_fbq_item(params['id'])
     @id = params['id']
     render partial: "list_fbq_item"
  end

  private

  def set_feedback_question
    @feedback_question = FeedbackQuestion.find(params[:id])
  end
  
end
