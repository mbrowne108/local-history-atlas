Visit.delete_all
Site.delete_all
User.delete_all

puts "Seeding users..."
matt = User.create(username: "matt", password: "123")
mike = User.create(username: "mike", password: "123")
ann = User.create(username: "ann", password: "123")

puts "Seeding sites..."
petes_tavern = Site.create(name: "Pete's Tavern", lat: 40.73653, lng: -73.986746, description: "Tavern built in 1829 at 129 East 18th Street", category: "Food/Drink")
statue_of_liberty = Site.create(name: "Statue of Liberty", lat: 40.689167, lng:  -74.044444, description: "Big green statue of a lady in the harbor", category: "Architecture")
central_park = Site.create(name: "Central Park", lat: 40.782222, lng: -73.965278, description: "Big green park in the middle of the island", category: "Nature")

puts "Seeding visits..."
petes_tavern.visits.create(user: matt, rating: 4, comment: "Was pretty cool, had some drinks.")
central_park.visits.create(user: matt, rating: 5, comment: "Was great! Lots of amazing birds.")
central_park.visits.create(user: mike, rating: 3, comment: "Was a little boring, but still nice to get fresh air.")
statue_of_liberty.visits.create(user: ann, rating: 0, comment: "Overcrowded.")

puts "Seeding complete!"