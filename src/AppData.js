
const
    today       = new Date(),
    currentYear = today.getFullYear(),
   
    eventNames  = [
        {name:'Controle Qualité Poids N° 3335', site:'Site: Secteur 1', state:'faible'},
        {name:'Controle Qualité Poids N° 1335', site:'Site: Secteur 2', state:'moyen'},
        {name:'Controle Qualité Poids N° 3235', site:'Site: Secteur 3', state:'urgent'},
        {name:'Controle Qualité Poids N° 3335', site:'Site: Secteur 4', state:'très-urgent'},
        {name:'Controle Qualité Poids N° 2435', site:'Site: Secteur 5', state:'très-faible'},
    ],
        
    sourceRecords   = new Array(10);

    const names = [
        {
            id        : 'francy',
            name      : 'Francy',
            eventColor: 'violet'
        },
        {
            id        : 'yann',
            name      : 'Yann',
            eventColor: 'grey'
        },
        {
            id        : 'eric',
            name      : 'Eric',
            eventColor: 'yellow'
        },
        {
            id        : 'Orion',
            name      : 'Orion',
            eventColor: 'red'
        },
        {
            id        : 'Sylvain',
            name      : 'Sylvain',
            eventColor: 'deep-orange'
        },
        {
            id        : 'Gilles',
            name      : 'Gilles',
            eventColor: 'green'
        }
    ];
    
    // Create 10 events
    for (let i = 0; i < 10; i++) {
    const randomIndex = Math.floor(Math.random() * names.length);
    const randomName = names[randomIndex].id;

    const eventTitles= eventNames[Math.round(Math.random() * 4)]
    const
        year          = Math.round(Math.random() * (currentYear + 5 - currentYear) + currentYear),
        month         = Math.round(Math.random() * 12),
        day           = Math.round(Math.random() * 31),
        hour          = Math.round(Math.random() * 8) + 4,
        durationHours = Math.round(Math.random() * 71) + 1;

    sourceRecords[i] = {
        id         : i,
        name       : eventTitles.name,
        startDate  : new Date(year, month, day, hour),
        endDate    : new Date(year, month, day, hour + durationHours),
        //eventColor : randomColor,
        resourceId : randomName,
        cellMenuItems : {
            customItem : { text : eventTitles.site }
        },
        
    };
}

const resources= names
const events = sourceRecords


export { events, resources };
