<template>
  <q-page>
    <q-list bordered separator>
      <!-- add new questions -->
      <q-item clickable v-ripple @click="addQuestion()">
        <q-item-section top side>
          <div class="text-grey-8">
            <q-btn
              class=""
              size="12px"
              flat
              dense
              round
              icon="add"
              @click="addQuestion()"
            />
          </div>
        </q-item-section>
        <q-item-section>
          <q-item-label>Add a question</q-item-label>
        </q-item-section>
      </q-item>

      <!-- questions list -->
      <q-item
        v-for="(item, index) in randomQuestions"
        :key="index"
        :disable="item.done"
      >
        <q-item-section>
          <q-item-label caption class="text-primary">{{
            item.category
          }}</q-item-label>
          <q-item-label>{{ item.question }}</q-item-label>
        </q-item-section>
        <q-item-section top side>
          <div class="text-grey-8 q-gutter-xs">
            <q-btn
              size="12px"
              flat
              dense
              round
              :color="item.pinned === true ? 'orange' : ''"
              icon="push_pin"
              @click="pinQuestion(item, $event)"
            />
            <q-btn
              size="12px"
              flat
              dense
              round
              icon="delete"
              @click="removeQuestion(index)"
            />
            <q-checkbox v-model="item.done" />
          </div>
        </q-item-section>
      </q-item>

      <!-- randomize questions list -->
      <q-item clickable v-ripple @click="reloadQuestions()">
        <q-item-section top side>
          <div class="text-grey-8 q-gutter-xs">
            <q-btn
              size="12px"
              flat
              dense
              round
              icon="refresh"
              @click="reloadQuestions()"
            />
          </div>
        </q-item-section>
        <q-item-section>
          <q-item-label>Randomize unpinned questions</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
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
    test(something) {},
    pinQuestion(question, event) {
      question.pinned = question.pinned ? false : true;
    },
    removeQuestion(index) {
      this.randomQuestions.splice(index, 1);
      this.numberOfRandomQuestions = this.randomQuestions.length;
    },
    addQuestion() {
      const newQuestion = this.getRandomQuestions(this.questions, 1);
      //$.set(vm.someObject, "done", false);
      this.randomQuestions.unshift(newQuestion[0]);
      this.numberOfRandomQuestions = this.randomQuestions.length;
    },
    reloadQuestions() {
      let pinnedQuestions = [];
      this.randomQuestions.forEach((item, index, object) => {
        if (item.pinned) {
          pinnedQuestions.push(item);
        }
      });
      const newQuestions = this.getRandomQuestions(
        this.questions,
        this.numberOfRandomQuestions - pinnedQuestions.length
      );
      //const merged = this.randomQuestions.concat(newQuestions);
      const merged = newQuestions.concat(pinnedQuestions);

      this.randomQuestions = merged;
    },
    getRandomQuestions(questions, numberOfQuestions) {
      let resultQuestions = [];

      for (let index = 0; index < numberOfQuestions; index++) {
        let questionNumber = Math.floor(this.randomNumber(0, questions.length));
        let question = questions[questionNumber];
        question.done = false;
        question.pinned = false;
        resultQuestions.push(question);
      }

      return resultQuestions;
    },
    randomNumber(min, max) {
      return Math.random() * (max - min) + min;
      // src: https://www.geeksforgeeks.org/how-to-generate-random-number-in-given-range-using-javascript/
    },
  },
  watch: {
    randomQuestions: function () {},
  },
  mounted() {
    this.randomQuestions = this.getRandomQuestions(
      this.questions,
      this.numberOfRandomQuestions
    );
  },
});
</script>
