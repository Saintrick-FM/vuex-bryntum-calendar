<template>
  <div
    class="d-flex justify-space-between rouded-xl w-100 bg-white"
    style="margin: 10px"
  >
    <v-btn-toggle
      v-model="view"
      class="rounded-xl bg-table_bg pa-0 ma-2 h-auto"
      selected-class="bg-violet pa-1 rounded-xl text-white "
      mandatory
    >
      <v-btn
        variant="text"
        class="text-black text-capitalize"
        v-for="tag in views"
        :key="tag"
        :value="tag"
        @click="setCurrentView(tag)"
      >
        {{ tag }}
      </v-btn>
    </v-btn-toggle>
    <v-btn outline class="text-primary"
      >Total events = "{{ events.length }}"</v-btn
    >

    <v-item-group selected-class="bg-purple">
      <v-item v-for="element in topRightNavElements" :key="element.id">
        <v-btn
          @click="editEvent"
          variant="text"
          :prepend-icon="element.icon"
          :class="selectedClass"
        >
          {{ element.name }}
        </v-btn>
      </v-item>
    </v-item-group>
  </div>

  <bryntum-calendar
    ref="calendar"
    v-bind="calendarConfig"
    :events="events"
    :resources="resources"
  />

  <!-- Boite de dialog au click du boutton noir de chaque card -->
  <!-- <v-dialog
    transition="dialog-top-transition"
    location="top right"
    v-model="isActive"
    type="success"
    width="auto"
    dismissible
  >
    <template v-slot:default="{ isActive }">
      <v-card>
        <v-toolbar color="primary" style="margin: 0 15px" title=""
          >Détails de la card cliquée</v-toolbar
        >
        <div class="text-h6 mb-1" style="margin: 0 15px">
          {{ cliquedEvent.name }}
        </div>
        <div class="text-h6 mb-1" style="margin: 0 15px">
          Appartient à : {{ cliquedEvent.resourceId }}
        </div>
        <div class="text-h6 mb-1" style="margin: 0 15px">
          {{ cliquedEvent.site }}
        </div>
        <div class="text-h6 mb-1" style="margin: 0 15px">
          Statut: {{ cliquedEvent.state }}
        </div>

        <v-card-actions class="justify-end">
          <v-btn variant="text" @click="isActive.value = false">Fermer</v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog> -->
</template>
<script>
import { BryntumCalendar } from "@bryntum/calendar-vue-3";
//import * as appData from '@/AppData';
import { mapActions, mapState } from "vuex";

export default {
  name: "App",
  data() {
    return {
      message: "Hello Vue!",
      counter: 0,
      eventUrl: "http://localhost:9000/events", // entrer l'url 

      topRightNavElements: [
        {
          id: 1,
          name: "Vues",
          icon: "mdi-eye",
          option: "Week",
          showWeekend: null,
          startHour: "07:00",
          endHour: "15:00",
        },
        {
          id: 2,
          name: "Filtres(0)",
          icon: "mdi-filter",
          option: "Month",
          showWeekend: false,
          startHour: "07:00",
          endHour: "15:00",
        },
        {
          id: 3,
          name: "Nouvelle tache",
          icon: "mdi-calendar-check",
          option: "Week",
          showWeekend: null,
          startHour: "07:00",
          endHour: "15:00",
        },
      ],
      view: "Semaines",
      views: ["Semaines", "Mois", "Agenda"],
      calendar: null,
      isActive: false,
      cliquedEvent: {},

      week_or_day_card_style: {
        // Render an icon showing number of invitees (editable in the event editor)
        onEventClick: (event) => {
          console.log("Event click", event.domEvent.srcElement.tagName);
          return event.domEvent.srcElement.tagName === "BUTTON" ? false : true;
        },
        eventRenderer: ({ eventRecord, renderData }) => {
          //console.log("eventRecord.name = ", eventRecord.name, renderData);
          const container = document.createElement("div");

          const nameEl = document.createElement("span");

          const isSameDay =
            eventRecord.startDate.getFullYear() ===
              eventRecord.endDate.getFullYear() &&
            eventRecord.startDate.getMonth() ===
              eventRecord.endDate.getMonth() &&
            eventRecord.startDate.getDate() === eventRecord.endDate.getDate();

          // Appliquer un style different si pour une case(1 jour) il y'a plusieurs evenements
          const short_or_list =
            isSameDay === false ? "b-event-small-name" : "b-event-name";
          nameEl.classList.add(short_or_list);
          nameEl.innerText =
            eventRecord.name.slice(0, 25) + " " + eventRecord.id;

          const status_line = document.createElement("span");
          status_line.classList.add("b-event-status");
          status_line.innerText = "Statut : Faible";

          const site_line = document.createElement("span");
          site_line.classList.add("b-event-site");
          site_line.innerText = "Site : secteur 1";

          const buttonEl = document.createElement("button");
          buttonEl.classList.add("btn");
          buttonEl.innerText = "+12";

          const checked_icon = document.createElement("img");
          checked_icon.classList.add("checked_icon");
          checked_icon.setAttribute(
            "src",
            require("./assets/checked-icon-3-removebg-preview.png")
          );

          // Ajout d'un footer sur chaque card  
          const card_footer = document.createElement("div");
          card_footer.classList.add("card-footer");

          buttonEl.addEventListener("click", () => {
            cliquedEvent.value = eventRecord.data;
            console.log("cliquedEvent = ", renderData.eventRecord.data);
            console.log("renderData = ", renderData);
            isActive.value = !isActive.value;

            // alert(`You clicked the "${eventRecord.resourceId}" event`);
          });

          container.appendChild(nameEl);
          
          if (short_or_list === "b-event-name") {
            container.appendChild(site_line);
            container.appendChild(status_line);
            card_footer.appendChild(buttonEl);
            card_footer.appendChild(checked_icon);
            container.appendChild(card_footer);
          }

          return container;
        },
      },

      eventsAlreadySet: 0,

      calendarConfig: {
        dateFormat: "DD MMMM YYYY",

        // Features named by the properties are included.
        // An object is used to configure the feature.
        eventTooltipFeature: {
          // Configuration options are passed on to the tooltip instance
          // We want the tooltip's left edge aligned to the right edge of the event if possible.
          align: "l-r",
        },
        mode: "week",

        // Modes are the views available in the Calendar.
        // An object is used to configure the view.
        modes: {
          week: this.week_or_day_card_style,
          day: this.week_or_day_card_style,
        },

        date: new Date(),
        // crudManager: {
        //   loadUrl: "http://localhost:9000/",
        //   autoLoad: true,
        //   autoSync : true
        //   //validateResponse :false
        // },

        columns: [
          { type: "resourceInfo", text: "Name", field: "name", width: 130 },
          { text: "City", field: "city", width: 90 },
        ],
      },
    };
  },

  components: {
    BryntumCalendar,
  },
  beforeMount() {
    console.log("Before Mounted");
    this.getEvents();
    this.getResources();
  },
  mounted() {
    console.log("Mounted");
    // Access and manipulate the DOM or perform any additional operations after the component is mounted.
    this.calendarConfig.tbar = {
      items: [
        {
          button1: { text: "A button", icon: "mdi-chevron-left" },
          button2: {
            text: "Right button 1",
            icon: "mdi-chevron-right",
            style: "margin-left:auto",
          },
          button3: { icon: "b-fa b-fa-gear" },
        },
      ],
    };
  },
  computed: {
    ...mapState(["events", "resources"]),
    
  },
  methods: {
    ...mapActions(["getEvents", "getResources"]),
    
    editEvent(eventRecord) {
      // implement your edit event logic here
      console.log(`Editing event ${eventRecord.name}`);
      //calendarConfig.triger.eventEdit
    },

    setCurrentView(current_View) {
      console.log("calendarConfig", this.calendarConfig);
      if (current_View === "Semaines") {
        this.calendarConfig.mode = "week";
      } else if (current_View === "Mois") {
        this.calendarConfig.mode = "month";
        
      } else {
        this.calendarConfig.mode = "agenda";
      }

      this.view = current_View;
      console.log("setCurrent");
    },
  },
};
</script>

<style lang="scss">
@import "./App.scss";
.b-daycellcollecter .b-dayview-content .b-cal-event-desc-complex {
  position: relative;

  .b-event-name,
  .b-event-small-name {
    font-weight: bold;
  }
  .b-event-name {
    margin-bottom: 8px;
  }
  .b-event-name,
  .b-event-status,
  .b-event-site {
    display: block;
  }
  .b-event-site {
    margin-bottom: 3px;
  }
  .card-footer {
    display: flex;
    position: absolute;
    bottom: 5px;
    right: 0;
    align-items: center;
    justify-content: space-between;

    .btn {
      background-color: black !important;
      color: white !important;
      align-items: center;
      border-radius: 15px;
      display: flex;
      flex-direction: row;
      font-size: 12px;
      font-style: normal;
      font-weight: 500;
      height: auto;
      justify-content: center;
      line-height: 16px;
      padding: 2px 10px;
      width: auto;
      margin-right: 4px;
    }
    //User checkbox
    .checked_icon {
      width: 30px;
      height: 15px;
      transition: all 0.2s ease-in-out;

      &:hover {
        border-radius: 15px;
        height: 18px;
        color: black;
        background-color: white;
      }
    }
  }
}
</style>
