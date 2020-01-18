class CatSerializer < ActiveModel::Serializer
        has_many :events
        attributes :id, :name, :sex, :age, :description, :status
      end

