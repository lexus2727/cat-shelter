class EventSerializer < ActiveModel::Serializer
    belongs_to :cat
    attributes :id, :cat_id, :title, :description, :updated_at, :created_at
end