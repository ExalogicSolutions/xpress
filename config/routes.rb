Rails.application.routes.draw do

  scope "(:locale)" , locale: /#{I18n.available_locales.join("|")}/ do

    get 'users/filter_department' => 'users#filter_department'

    get "users/show_head_details", to: "users#show_head_details"

    get "users/reset_head", to: "users#reset_head"

    get "users/reset", to: "users#reset", :as => "user_reset" 

    get "users/set_head", to: "users#set_head"
    
    get "users/set", to: "users#set" 

    post "users/create_staff", to: "users#create_staff"

    get 'users/filter_sub_department' => 'users#filter_sub_department'

    get 'users/edit_details' => 'users#edit_details'
    get 'users/set_time' => 'users#set_time'

    patch 'users/:id/update_personal_detail' => 'users#update_personal_detail', :as => "user_update_personal_detail"

    get "feedback_questions/get_feedback_question", to: "feedback_questions#get_feedback_question"

    get "feedback_questions/list_branch_feedback_questions", to: "feedback_questions#list_branch_feedback_questions"

    get "feedback_questions/list_sub_department_feedback_questions", to: "feedback_questions#list_sub_department_feedback_questions"

    get 'feedback_questions/list_department_feedback_questions' => 'feedback_questions#list_department_feedback_questions'

    get "feedback_questions/edit_department_fbq" => "feedback_questions#edit_department_fbq"
    
    get 'feedback_questions/get_status_approved' => 'feedback_questions#get_status_approved'

    get "feedback_questions/approved_status" => "feedback_questions#approved_status" 

    get "feedback_questions/customer_feedback_question" => "feedback_questions#customer_feedback_question" 

    get "feedback_questions/show_item_question" => "feedback_questions#show_item_question"  

    get "feedback_questions/edit_fbq_item" => "feedback_questions#edit_fbq_item", :as => "edit_fbq_item"

    patch "feedback_questions/:id/update_fbq_item" => "feedback_questions#update_fbq_item", :as => "update_fbq_item"

    get "feedback_questions/delete_fbq_item" => "feedback_questions#delete_fbq_item", :as => "delete_fbq_item"  

    get "industries/get_industry", to: "industries#get_industry"

    get "industries/show_images" => "industries#show_images" 

    get "sub_departments/find_industry", to: "sub_departments#find_industry"

    get 'departments/view_details' => 'departments#view_details', :as => "view_details"

    get 'departments/filter_branch' => 'departments#filter_branch', :as => "filter_branch"

    get 'sub_departments/filter_branch_by_sub_dept' => 'sub_departments#filter_branch_by_sub_dept', :as => "filter_branch_by_sub_dept"

    get 'sub_departments/filter_department' => 'sub_departments#filter_department', :as => "filter_department"

    get "branches/get_branch", to: "branches#get_branch"

    get "branches/list", to: "branches#list"

    get "branches/branch_head_edit_form", to: "branches#branch_head_edit_form"

    post "branches/edit_branch_head", to: "branches#edit_branch_head"

    get "branches/show_branch_head", to: "branches#show_branch_head"

    get "branches/branch_head_form", to: "branches#branch_head_form"

    post "branches/create_branch_head", to: "branches#create_branch_head"
    get "branches/show_images", to: "branches#show_images"

    get "sub_departments/sub_department_head_form", to: "sub_departments#sub_department_head_form"

    post "sub_departments/create_sub_department_head", to: "sub_departments#create_sub_department_head"
    
    get 'sub_departments/show_sub_department_head' => 'sub_departments#show_sub_department_head', :as => "show_sub_department_head" 

    get "sub_departments/sub_department_head_edit_form", to: "sub_departments#sub_department_head_edit_form"

    post "sub_departments/edit_sub_department_head", to: "sub_departments#edit_sub_department_head"

    put 'branches/:id/assign_image_head' => 'branches#assign_image_head', :as => "assign_image_branch_head" 

    put 'sub_departments/:id/assign_image_head' => 'sub_departments#assign_image_head', :as => "assign_image_sub_dept_head" 

    get 'departments/get_department_delete' => 'departments#get_department_delete', :as => "get_department_delete"

    get "sub_departments/get_sub_department", to: "sub_departments#get_sub_department"
    
    get "sub_departments/show_images", to: "sub_departments#show_images"
    
    get 'departments/assign_department_head' => 'departments#assign_department_head', :as => "assign_department_head" 
    
    post 'departments/create_department_head' => 'departments#create_department_head', :as => "create_department_head" 

    get 'departments/show_department_head' => 'departments#show_department_head', :as => "show_department_head" 

    get 'departments/edit_department_head' => 'departments#edit_department_head', :as => "edit_department_head" 
   
    put 'departments/:id/assign_image_head' => 'departments#assign_image_head', :as => "assign_image_head" 
   
    post 'departments/update_department_head' => 'departments#update_department_head', :as => "update_department_head" 
     get "departments/show_images", to: "departments#show_images"

    get 'feedback_questions/filter_branch_by_industry' => 'feedback_questions#filter_branch_by_industry'

    post 'feedback_questions/create_item_fbq' => 'feedback_questions#create_item_fbq' , :as => 'create_item_fbq'

     get 'feedback_questions/filter_department' => 'feedback_questions#filter_department'

    post 'reports/submit_feedback_answers' => 'reports#submit_feedback_answers', :as => "submit_feedback_answers"

    get 'feedback_questions/filter_sub_department' => 'feedback_questions#filter_sub_department'

    get 'menus/show' => 'menus#show' 

    match 'menus/menucard', to: 'menus#menucard', via: [:get, :post] 

    get 'menus/filter_branch_by_industry' => 'menus#filter_branch_by_industry'

    get 'menus/filter_department' => 'menus#filter_department'

    get 'menus/show_menu' => 'menus#show_menu'

    get 'menus/get_menu' => 'menus#get_menu'

    get 'menus/get_items' => 'menus#get_items'
   
    get 'menus/get_categories' => 'menus#get_categories'

    get 'menus/get_menus' => 'menus#get_menus'

    get 'menus/show_images' => 'menus#show_images'

    post 'menus/assign_menu_priority' => 'menus/assign_menu_priority', :as => 'assign_menu_priority'

    post "reports/get_list_fbq" => "reports#get_list_fbq", :as => "get_list_fbq"

    # for authenticated user
    authenticated :user do
      root to: 'reports#home', as: :authenticated_root
    end
    
    # for unauthenticated user
    root to: redirect('/users/sign_in')

    devise_for :users

    resources :users

    resources :reports

    resources :departments    #Restful routes for departments
    
    resources :industries

    resources :sub_departments

    resources :branches

    resources :feedback_questions

    resources :categories

    resources :menus

  end

end
