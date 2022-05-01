class UserVisitSerializer < ActiveModel::Serializer
  include Rails.application.routes.url_helpers
  attributes :id, :rating, :comment, :image, :site, :user, :created_at

  def image
    rails_blob_path(object.image, only_path: true) if object.image.attached?
  end
  
end
