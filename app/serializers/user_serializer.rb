class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :password_digest, :created_at
  has_many :visits, serializer: UserVisitSerializer
  has_many :sites
end
