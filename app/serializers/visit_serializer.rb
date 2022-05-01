class VisitSerializer < ActiveModel::Serializer
  include Rails.application.routes.url_helpers
  attributes :id, :rating, :comment, :image, :user, :site, :created_at
  has_one :user
  has_one :site

  def image
    rails_blob_path(object.image, only_path: true) if object.image.attached?
  end

end
