README.md

mongoexport --db american_innovations --collection wilds --type=csv --fields name,email,phone,innovation,description --out wildcards.csv

db.votes.aggregate([{$group: {_id: '$votedFor', count: {$sum: 1}}}])
