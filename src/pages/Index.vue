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
        v-for="item in randomQuestions"
        :key="item.id"
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
              @click="pinQuestion(item)"
            />
            <q-btn
              size="12px"
              flat
              dense
              round
              icon="delete"
              @click="removeQuestion(item.id)"
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

<script setup>
import { onMounted } from "vue";
import { useQuestions } from "src/composables/useQuestions";

const { randomQuestions, init, pinQuestion, removeQuestion, addQuestion, reloadQuestions } =
  useQuestions();

onMounted(() => {
  init();
});
</script>
