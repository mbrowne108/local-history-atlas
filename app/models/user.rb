class User < ApplicationRecord
    has_secure_password
    has_many :visits
    has_many :sites, through: :visits

    validates :username, presence: true, uniqueness: true
end
