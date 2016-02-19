module.exports = {
  rounds: [
    {
      name: 'Round 1',
      competitors: ['GPS','Hearing Aid','Mobile Phone','Sewing Machine','Kevlar','Electric Guitar','Air Conditioner','3D Printer','Robotic Arm'],
      starting_date: new Date("2016-01-24T00:00:00-05:00"),
      ending_date: new Date("2016-02-07T12:00:00-05:00")
    },{
      name: 'Round 2',
      competitors: ['GPS','Mobile Phone','Sewing Machine','Air Conditioner','3D Printer'],
      starting_date: new Date("2016-02-07T12:00:01-05:00"),
      ending_date: new Date("2016-02-14T12:00:00-05:00")
    },
    {
      name: 'Round 3',
      competitors: ['GPS','Mobile Phone','Sewing Machine'],
      starting_date: new Date("2016-02-14T12:00:01-05:00"),
      ending_date: new Date("2016-02-19T07:00:00-05:00")
    },
    {
      name: 'Round 4',
      competitors: ['Transistor','Mobile Phone','Sewing Machine'],
      starting_date: new Date("2016-02-19T07:00:01-05:00"),
      ending_date: new Date("2016-02-26T22:00:01-05:00")
    }
  ],
  innovations: [
    {
      name: 'Transistor',
      description: 'Invented in 1947 by three men at Bell Laboratories, the transistor was designed to replace inefficient vacuum tubes as the key building block of America’s telephone network. It also made the miniaturization of technology possible, paving the way for computers, cell phones, GPS devices, and much more.',
      eliminated: false,
      image: {
        src: '/images/transistor.png',
        thumb: '/images/thumb_transistor.png',
        width: 220,
        height: 174
      },
    },{
      name: 'GPS',
      description: 'The Global Positioning System was first developed by the Defense Department in 1957 and became fully operational in 1993. Today, the GPS is used by pilots, adventurers, and lost travelers. Listen to Chris Catrambone, an American entrepreneur that is rescuing migrants and refugees in the Mediterranean, make his case for why the GPS is America\'s greatest innovation.',
      eliminated: false,
      image: {
        src: '/images/gps.png',
        thumb: '/images/thumb_gps.png',
        width: 220,
        height: 205
      },
      audio: 'gps'

    },{
      name: 'Hearing Aid',
      description: 'In 1898, American engineer Miller Reese Hutchinson patented the world’s first battery-powered hearing aid. Today’s models are small, discreet, and extremely sophisticated, catering to millions of people across the world who suffer from hearing loss. Listen to Richard Einhorn, an American composer, make his case for why the hearing aid is America\'s greatest innovation.',
      eliminated: false,
      image: {
        src: '/images/hearing-aid.png',
        thumb: '/images/thumb_hearing-aid.png',
        width: 202,
        height: 219
      },
      audio: 'hearingaid'
    },{
      name: 'Mobile Phone',
      description: 'Invented in 1973 by Martin Cooper of Motorola, the first mobile phone weighed two pounds and cost more than $4,000. Today, more than 6 billion people use cell phones. Listen to Melinda Gates, philanthropist and wife of Microsoft Founder Bill Gates, make her case for why the cell phone is America\'s greatest innovation.',
      eliminated: false,
      image: {
        src: '/images/mobile-phone.png',
        thumb: '/images/thumb_mobile-phone.png',
        width: 140,
        height: 259
      },
      audio: 'cell'
    },{
      name: 'Sewing Machine',
      description: 'The sewing machine was invented in 1846 by Elias Howe in Massachusetts. Today sewing machines are used by countless artists, designers, and hobbyists. Listen to Deborah Nadoolman Landis, a Hollywood costume designer, make her case for why the sewing machine is America\'s greatest innovation.',
      eliminated: false,
      image: {
        src: '/images/sewing-machine.png',
        thumb: '/images/thumb_sewing-machine.png',
        width: 221,
        height: 166
      },
      audio: 'sewing'
    },{
      name: 'Kevlar',
      description: 'In the \'60s, chemist Stephanie Kwolek set out to develop a material for tires, but she inadvertently created something five times stronger than steel. The miracle fiber known as Kevlar is now used in bulletproof vests and is credited with saving thousands of lives. Listen to Ray Kelly, former commissioner of the NYC Police Department, make his case for why Kevlar is America\'s greatest innovation.',
      eliminated: false,
      image: {
        src: '/images/kevlar.png',
        thumb: '/images/thumb_kevlar.png',
        width: 198,
        height: 252
      },
      audio: 'kevlar'
    },{
      name: 'Electric Guitar',
      description: 'The world’s first electric guitar was designed in the early 1930s by musician George Beauchamp. Decades later, this instrument has fundamentally changed music and sound forever. Listen to Vernon Reid, guitarist for the band Living Colour, make his case for why the electric guitar is America\'s greatest innovation.',
      eliminated: false,
      image: {
        src: '/images/electric-guitar.png',
        thumb: '/images/thumb_electric-guitar.png',
        width: 180,
        height: 277
      },
      audio: 'guitar'
    },{
      name: 'Air Conditioner',
      description: 'In order to keep ink from running at a Brooklyn printing shop, young engineer Willis Carrier invented the first air conditioning unit in 1902. His invention became a key tool used in the preservation of art and artifacts. Listen to Kirk Johnson, director of the National Museum of Natural History, make his case for why air conditioning is America\'s greatest innovation.',
      eliminated: false,
      image: {
        src: '/images/air-conditioner.png',
        thumb: '/images/thumb_air-conditioner.png',
        width: 210,
        height: 169
      },
      audio: 'ac'
    },{
      name: '3D Printer',
      description: 'In 1983, American engineer Chuck Hull developed a process he called “rapid prototyping,” where models could be designed and created in a matter of hours. Today it’s called 3D printing, and it’s used to make everything from prosthetics to Hollywood props. Listen to Colin Consavage, an 11-year-old kid who made his own prosthetic hand with a 3D printer, make his case for why the 3D printer is America\'s greatest innovation.',
      eliminated: false,
      image: {
        src: '/images/3d-printer.png',
        thumb: '/images/thumb_3d-printer.png',
        width: 204,
        height: 206
      },
      audio: '3d'
    },{
      name: 'Robotic Arm',
      description: 'American inventor George Devol patented the world’s first programmable robotic arm in 1961. It completely revolutionized the auto industry in the U.S. and Japan by improving efficiency and limiting workers’ exposure to toxic materials. Listen to Adam Ferrara, an actor, comedian, and host of Top Gear U.S., make his case for why the robotic arm is America\'s greatest innovation.',
      eliminated: false,
      image: {
        src: '/images/robotic-arm.png',
        thumb: '/images/thumb_robotic-arm.png',
        width: 218,
        height: 226
      },
      audio: 'robot'
    },
  ]
}


