<template>
  <q-page>
    <q-list bordered separator>
      <!-- add new questions -->
      <q-item clickable v-ripple @click="addQuestion()">
        <q-item-section top side>
          <div class="text-grey-8">
            <q-btn
              size="12px"
              flat
              dense
              round
              icon="add"
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
    pinQuestion(question, event) {
      question.pinned = question.pinned ? false : true;
    },
    removeQuestion(index) {
      this.randomQuestions.splice(index, 1);
      this.numberOfRandomQuestions = this.randomQuestions.length;
    },
    addQuestion() {
      const displayedIds = this.randomQuestions.map((q) => q.id);
      const newQuestion = this.getRandomQuestions(this.questions, 1, displayedIds);
      if (newQuestion.length > 0) {
        this.randomQuestions.unshift(newQuestion[0]);
        this.numberOfRandomQuestions = this.randomQuestions.length;
      }
    },
    reloadQuestions() {
      const pinnedQuestions = this.randomQuestions.filter((item) => item.pinned);
      const pinnedIds = pinnedQuestions.map((q) => q.id);
      const newQuestions = this.getRandomQuestions(
        this.questions,
        this.numberOfRandomQuestions - pinnedQuestions.length,
        pinnedIds
      );
      this.randomQuestions = newQuestions.concat(pinnedQuestions);
    },
    getRandomQuestions(questions, numberOfQuestions, excludeIds = []) {
      const available = questions.filter((q) => !excludeIds.includes(q.id));
      const count = Math.min(numberOfQuestions, available.length);
      const resultQuestions = [];

      for (let index = 0; index < count; index++) {
        const randomIndex = Math.floor(this.randomNumber(0, available.length));
        const question = { ...available[randomIndex], done: false, pinned: false };
        resultQuestions.push(question);
        available.splice(randomIndex, 1);
      }

      return resultQuestions;
    },
    randomNumber(min, max) {
      return Math.random() * (max - min) + min;
      // src: https://www.geeksforgeeks.org/how-to-generate-random-number-in-given-range-using-javascript/
    },
  },
  mounted() {
    this.randomQuestions = this.getRandomQuestions(
      this.questions,
      this.numberOfRandomQuestions
    );
  },
});
</script>
