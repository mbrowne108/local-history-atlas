class UserVisitSerializer < ActiveModel::Serializer
  attributes :id, :rating, :comment, :site, :user
end
