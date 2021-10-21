<template>
  <q-page>
    <q-list bordered separator>
      <q-item clickable v-ripple @click="reloadQuestions()">
        <q-item-section>
          <q-item-label
            >Randomize {{ numberOfRandomQuestions }} questions</q-item-label
          >
        </q-item-section>
      </q-item>
      <q-item clickable v-for="(item, index) in randomQuestions" :key="index">
        <q-item-section>
          <q-item-label caption>{{ item.category }}</q-item-label>
          <q-item-label>{{ item.question }}</q-item-label>
        </q-item-section>
        <q-item-section top side>
          <div class="text-grey-8 q-gutter-xs">
            <q-btn
              class="gt-xs"
              size="12px"
              flat
              dense
              round
              icon="delete"
              @click="removeQuestion(index)"
            />
            <q-btn class="gt-xs" size="12px" flat dense round icon="done" />
          </div>
        </q-item-section>
      </q-item>
      <q-item clickable v-ripple @click="addQuestion()">
        <q-item-section>
          <q-item-label>Add a question</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>

    <div class="row q-pa-md q-gutter-md justify-start">
      <q-card
        class="my-card col-4 column"
        v-for="(item, index) in randomQuestions"
        :key="index"
      >
        <q-card-section class="col">
          <div class="text-caption text-blue-grey-4">
            <p class="">
              {{ item.category }}
            </p>
          </div>
          <div class="">{{ item.question }}</div>
        </q-card-section>

        <q-card-actions>
          <q-btn flat @click="randomQuestions.splice(index, 1)">Remove</q-btn>
          <q-btn flat @click="randomQuestions.splice(index, 1)">Done</q-btn>
        </q-card-actions>
      </q-card>

      <q-btn flat @click="addQuestion()">Add</q-btn>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import questions from "assets/questions.json";

export default defineComponent({
  name: "PageIndex",
  data() {
    return {
      questions: questions, // 3
      randomQuestions: [],
      numberOfRandomQuestions: 4,
    };
  },
  methods: {
    removeQuestion(index) {
      this.randomQuestions.splice(index, 1);
      console.log(this.randomQuestions.length);
      this.numberOfRandomQuestions = this.randomQuestions.length;
    },
    addQuestion() {
      const newQuestion = this.getRandomQuestions(this.questions, 1);
      this.randomQuestions.push(newQuestion[0]);
      this.numberOfRandomQuestions = this.randomQuestions.length;
    },
    reloadQuestions() {
      this.randomQuestions = this.getRandomQuestions(
        this.questions,
        this.numberOfRandomQuestions
      );
    },
    getRandomQuestions(questions, numberOfQuestions) {
      let resultQuestions = [];

      for (let index = 0; index < numberOfQuestions; index++) {
        let questionNumber = Math.floor(this.randomNumber(0, questions.length));

        resultQuestions.push(questions[questionNumber]);
      }

      return resultQuestions;
    },
    randomNumber(min, max) {
      return Math.random() * (max - min) + min;
      // src: https://www.geeksforgeeks.org/how-to-generate-random-number-in-given-range-using-javascript/
    },
  },
  watch: {
    randomQuestions: function () {
      console.log(this.randomQuestions.length);
    },
  },
  mounted() {
    console.log(this.$q);
    console.log(this.$root);
    this.randomQuestions = this.getRandomQuestions(
      this.questions,
      this.numberOfRandomQuestions
    );
  },
});
</script>
