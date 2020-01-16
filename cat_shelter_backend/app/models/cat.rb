class Cat < ApplicationRecord
    has_many :events, dependent: :destroy 
end
