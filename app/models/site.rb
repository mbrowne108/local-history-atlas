class Site < ApplicationRecord
    has_many :visits
    has_many :users, through: :visits

    validates :name, presence: true, uniqueness: true
    validates :lat, numericality: { other_than: 0 }
    validates :lng, numericality: { other_than: 0 }
    validates :description, presence: true, length: { minimum: 50 }
    validates :category, presence: true
end
