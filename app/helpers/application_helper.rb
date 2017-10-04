module ApplicationHelper
	def link_to_add_fields(name, m, association, cssClass, title)  
	  	new_object = m.object.class.reflect_on_association(association).klass.new  
	  	fields = m.fields_for(association, new_object, :child_index => "new_#{association}") do |builder|  
	    	render(association.to_s.singularize + "_fields", :m => builder)  
		end  
  		link_to name, "#", :onclick => h("add_fields(this, \"#{association}\", \"#{escape_javascript(fields)}\")"), :class => cssClass, :title => title 
	end
	def link_to_remove_fields(name, m, locals={})
    	m.hidden_field(:_destroy) + link_to(name, "#",:onclick => h("remove_fields(this)"), class: locals[:class])
  	end

  	def action_show(current_user)
  		if [ADMIN,BRANCH_HEAD].include?(current_user.user_type)
  		  return true
  		else
  		  return false
  		end	
  	end	

end
