class UserVisitSerializer < ActiveModel::Serializer
  attributes :id, :rating, :comment, :site, :user, :created_at
end
