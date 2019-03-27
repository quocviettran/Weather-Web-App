<template>
  <div v-if="temperatureNow !== null" class="forecast">
    <v-expansion-panel >
      <v-expansion-panel-content>
        <template v-slot:header>
          <div>Today</div>
        </template>

        <v-card>
          <v-container>
            <v-layout row wrap align-left>
              <v-flex xs1>
                <v-img :src="temperatureNow.icon" height="60" width="60"/>
              </v-flex>
              <v-flex xs11>
                <v-card-text>
                  Date: {{temperatureArray[0].date}}
                  <br>
                  Temperature: {{temperatureNow.temperature}}
                </v-card-text>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </v-expansion-panel-content>

      <!--Tomorrow drop down tab -->
      <v-expansion-panel-content>
        <template v-slot:header>
          <div>Tomorrow</div>
        </template>

        <v-card>
          <v-container>
            <v-layout row wrap align-left>
              <v-flex xs1>
                <v-img :src="temperatureArray[1].iconDay" height="60" width="60"/>
              </v-flex>
              <v-flex xs11>
                <v-card-text>
                  Date: {{temperatureArray[1].date}}
                  <br>
                  Temperature: {{temperatureArray[1].maxTemperature}}
                </v-card-text>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </v-expansion-panel-content>

      <!-- Longterm forecast -->
      <v-expansion-panel-content>
        <template v-slot:header>
          <div>Longterm Forecast</div>
        </template>

        <v-card>
          <v-container align-center>
            <v-layout row wrap>
              <!-- First forecast-->

              <v-flex xs1>
                <v-img :src="temperatureArray[2].iconDay" height="60" width="60"/>
              </v-flex>

              <v-flex xs3>
                <v-card-text>
                  Date: {{temperatureArray[2].date}}
                  <br>
                  Temperature: {{temperatureArray[2].maxTemperature}}
                </v-card-text>
              </v-flex>
              <!-- Second forecast-->
              <v-flex xs1>
                <v-img :src="temperatureArray[3].iconDay" height="60" width="60"/>
              </v-flex>
              <v-flex xs3>
                <v-card-text>
                  Date: {{temperatureArray[3].date}}
                  <br>
                  Temperature: {{temperatureArray[3].maxTemperature}}
                </v-card-text>
              </v-flex>
              <!-- Third forecast-->
              <v-flex xs1>
                <v-img :src="temperatureArray[4].iconDay" height="60" width="60"/>
              </v-flex>
              <v-flex xs3>
                <v-card-text>
                  Date: {{temperatureArray[4].date}}
                  <br>
                  Temperature: {{temperatureArray[4].maxTemperature}}
                </v-card-text>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </div>
</template>
<script>
export default {
  props: ["localizedName", "temperatureNow", "temperatureArray"]
};
</script>

