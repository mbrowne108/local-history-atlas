class VisitSerializer < ActiveModel::Serializer
  attributes :id, :rating, :comment, :user, :site, :created_at
  has_one :user
  has_one :site

end
