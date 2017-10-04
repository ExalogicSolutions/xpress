task :rating_type_task => [:environment]  do
 p "task Started"
 insert_rating_type = ["bars-1to10","bars-pill","css-stars","bars-movie"]
 #rating_type_present = RatingType.all.pluck(:name)
   RatingType.all.delete_all
   insert_rating_type.each do |k|
   	p "Rating Creation Started"
      
       	 RatingType.create(name: k)
       p "Rating Creation End"
   end

 p "task End"  
end