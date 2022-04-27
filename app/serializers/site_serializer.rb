class SiteSerializer < ActiveModel::Serializer
  attributes :id, :name, :lat, :lng, :description, :category
  has_many :users
  has_many :visits, serializer: UserVisitSerializer
end
