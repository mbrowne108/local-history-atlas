class VisitSerializer < ActiveModel::Serializer
  attributes :id, :rating, :comment, :user, :site
  has_one :user
  has_one :site
end
