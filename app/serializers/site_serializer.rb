class SiteSerializer < ActiveModel::Serializer
  attributes :id, :name, :lat, :lng, :description
  has_many :users
end
