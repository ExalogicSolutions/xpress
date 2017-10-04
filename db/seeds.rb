# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

p '--------------------------  Creation of Admin User---------------------------------------'
user1 = User.new(first_name: "admin", last_name: "admin", user_name: "admin", user_type: "admin", email: "admin@exalogic.com",password: "password")
user1.save
PersonalDetail.create( name: user1.user_name, gender: "male", address_line1: "1st block ", address_line2: "Kormangala", landmark: "SBI Bank", city: "Bangalore", pincode: "5600102", state: "Karnataka", country: "India", contact_number: "9767761315", fax_number: "1234567", website: "wwww.exalogic.in", user_id: user1.id)

 p '-------------------------- Admin User Created Successfully---------------------------------------'


 p "--------------------------Creation of Industry ---------------------------------------"

 industry = Industry.new( name: "Hotel", user_id: user1.id, industry_type: "Hotel",rating_type_id: 1)
 industry.save

 p '-------------------------- Industry Created Successfully---------------------------------------------'

 p '-------------------------- Creation of Branch ---------------------------------------'

branch1= Branch.new(industry_id: industry.id)

p '-------------------------- Creation of Branch User---------------------------------------'
user2 = User.new(first_name: "branch", last_name: "branch", user_name: "branch", user_type: "branch_head", email: "branch@exalogic.com",password: "password")
user2.save
PersonalDetail.create( name: user2.user_name, gender: "male", address_line1: "1st block ", address_line2: "Kormangala", landmark: "SBI Bank", city: "Bangalore", pincode: "5600102", state: "Karnataka", country: "India", contact_number: "9767761315", fax_number: "1234567", website: "wwww.exalogic.in", user_id: user2.id)

 p '--------------------------Branch User Created Successfully---------------------------------------'

branch1.user_id = user2.id
branch1.save

PersonalDetail.create( name: "BBQ", address_line1: "1st block ", address_line2: "Kormangala", landmark: "SBI Bank", city: "Bangalore", pincode: "5600102", state: "Karnataka", country: "India", contact_number: "1234567890", fax_number: "1234567890", website: "wwww.google.com",  branch_id: branch1.id )
p '-------------------------- Branch Created Successfully---------------------------------------------'



p '-------------------------- Creation of Department User---------------------------------------'

department =  Department.new( branch_id: branch1.id )

p '-------------------------- Creation of Department User---------------------------------------'
user3 = User.new(first_name: "department", last_name: "department", user_name: "department", user_type: "department_head", email: "department@exalogic.com",password: "password")
user3.save
PersonalDetail.create( name: user3.user_name, gender: "male", address_line1: "1st block ", address_line2: "Kormangala", landmark: "SBI Bank", city: "Bangalore", pincode: "5600102", state: "Karnataka", country: "India", contact_number: "9767761315", fax_number: "1234567", website: "wwww.exalogic.in", user_id: user3.id)

p '-------------------------- Department User Created Successfully---------------------------------------'

department.user_id = user3.id
department.save

PersonalDetail.create( name: "Services", address_line1: "1st block ", address_line2: "Kormangala", landmark: "SBI Bank", city: "Bangalore", pincode: "5600102", state: "Karnataka", country: "India", contact_number: "1234567890", fax_number: "1234567890", website: "wwww.google.com",  department_id: department.id, branch_id: branch1.id )

p '-------------------------- Department  Created Successfully---------------------------------------------'



p '--------------------------Creation of Sub Department---------------------------------------'

subdepartment =  SubDepartment.new( department_id: department.id)

p '--------------------------Creation of Sub Department User---------------------------------------'
user4 = User.new(first_name: "sub-department", last_name: "sub-department", user_name: "sub-department", user_type: "sub_department_head", email: "subdepartment@exalogic.com",password: "password")
user4.save
PersonalDetail.create( name: user4.user_name, gender: "male", address_line1: "1st block ", address_line2: "Kormangala", landmark: "SBI Bank", city: "Bangalore", pincode: "5600102", state: "Karnataka", country: "India", contact_number: "9767761315", fax_number: "1234567", website: "wwww.exalogic.in", user_id: user4.id)

p '--------------------------Sub Department User Created Successfully---------------------------------------------'

subdepartment.user_id = user4.id
subdepartment.save

PersonalDetail.create( name: "Food", address_line1: "1st block ", address_line2: "Kormangala", landmark: "SBI Bank", city: "Bangalore", pincode: "5600102", state: "Karnataka", country: "India", contact_number: "1234567890", fax_number: "1234567890", website: "wwww.google.com",  sub_department_id: subdepartment.id ,department_id: department.id, branch_id: branch1.id )



p '--------------------------Sub Department User Created Successfully---------------------------------------------'

