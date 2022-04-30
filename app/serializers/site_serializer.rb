class SiteSerializer < ActiveModel::Serializer
  include Rails.application.routes.url_helpers
  attributes :id, :name, :lat, :lng, :image, :description, :category
  has_many :users
  has_many :visits, serializer: UserVisitSerializer

  def image
    rails_blob_path(object.image, only_path: true) if object.image.attached?
  end
end
