README.md

mongoexport --db american_innovations --collection wilds --type=csv --fields name,email,phone,innovation,description --out wildcards.csv

db.votes.aggregate([{$group: {_id: '$votedFor', count: {$sum: 1}}}])


MongoDB connection string: 127.0.0.1:27017/american_innovations

Express app.listen: 8080, APP_PRIVATE_IP
