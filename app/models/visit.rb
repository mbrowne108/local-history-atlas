class Visit < ApplicationRecord
  belongs_to :user
  belongs_to :site
  has_one_attached :image

  validates :rating, presence: true, numericality: { in: 0..5 }
  validates :comment, presence: true, uniqueness: true
end
