class Image < ActiveRecord::Base
	belongs_to :imageable, polymorphic: true
	#mount_uploaders :avatars, AvatarUploader
	mount_uploaders :avatars, AdminAvatarUploader
end
