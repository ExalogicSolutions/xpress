class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
 
  protect_from_forgery with: :exception

  before_action :authenticate_user!

  before_filter :set_locale
  
  before_filter :get_notification, :if => Proc.new { is_admin? }

  def is_admin?
    if params[:controller] != "devise/sessions" and params[:action] != "destroy"
     current_user.user_type == ADMIN
    else
     return false 
    end
    
  end

  def get_notification
     @count = 0
        # @updation_detail=PersonalDetail.find_by_sql "select * from personal_details where CAST(updated_at AS DATE) = CAST(CURRENT_TIMESTAMP AS DATE)"
        # @updation_detail=@updation_detail.map{|detail| (detail.branch.present? ? (current_user.industries.pluck(:id).include?(detail.branch.industry_id) ? detail : nil) : nil) || (detail.department.present? ? (current_user.industries.pluck(:id).include?(detail.department.branch.industry_id) ? detail : nil) : nil) || (detail.sub_department.present? ? (current_user.industries.pluck(:id).include?(detail.sub_department.department.branch.industry_id) ? detail : nil) : nil)}.reject{|x| x.nil?}
        # @question_pending=FeedbackQuestion.where(status: nil).map{|detail| (detail.branch.present? ? (current_user.industries.pluck(:id).include?(detail.branch.industry_id) ? @count=@count+1 : nil) : nil) || (detail.department.present? ? (current_user.industries.pluck(:id).include?(detail.department.branch.industry_id) ? @count=@count+1 : nil) : nil) || (detail.sub_department.present? ? (current_user.industries.pluck(:id).include?(detail.sub_department.department.branch.industry_id) ? @count=@count+1 : nil) : nil)}.reject{|x| x.nil?}
        
        # pd = pd.where(:updated_at => session[:time].to_datetime..DateTime.now)
        pd, feedbackquestion = User.get_notifaction_alert(current_user,session[:time])
        @updation_detail = pd.map{|h| {:id => h.id, :name => h.name, :time => h.updated_at} }.uniq
        @question_pending = feedbackquestion.count
        @count = @question_pending + @updation_detail.count
        # session[:time] =  DateTime.now          
  end  

    
  
  def after_sign_in_path_for(resource_or_scope)   
    session[:time] =  current_user.last_sign_in_at.present? ? current_user.last_sign_in_at : current_user.current_sign_in_at
    root_path
  end  
  private
  	def set_locale
      I18n.locale = cookies[:glob_lan]  if cookies[:glob_lan]
  		I18n.locale = params[:locale] if params[:locale].present?
      cookies[:glob_lan] = I18n.locale
  	end

  	def default_url_options(options = {})
  		{locale: I18n.locale}
  	end
    

end
