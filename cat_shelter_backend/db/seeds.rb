# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Cat.create(name: 'Casey', sex:'Female', age: 8, description: 'Extremely shy', status: 'Available')
Event.create(cat_id: 1, title: 'Vet visit', description: 'Rabies vaccination')
Event.create(cat_id: 1, title: 'Dental checkup', description: 'Teeth cleaning')

Cat.create(name: 'Jem', sex:'Female', age: 13, description: 'Friendly, outgoing', status: 'Available')
Event.create(cat_id: 2, title: 'Vet visit', description: 'Initial assessment')
Event.create(cat_id: 2, title: 'Vet visit', description: 'Allergy medicine')
Event.create(cat_id: 2, title: 'Foster', description: 'Fostered by the Jones family')
 