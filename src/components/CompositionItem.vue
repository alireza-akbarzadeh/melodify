<template>
  <div class="border border-gray-200 p-3 mb-4 rounded">
    <div v-show="!showForm">
      <h4 class="inline-block text-2xl font-bold">{{ song.modified_name }}</h4>
      <button class="ml-1 py-1 px-2 text-sm rounded text-white bg-red-600 float-right">
        <i class="fa fa-times"></i>
      </button>
      <button
        @click.prevent="showForm = !showForm"
        class="ml-1 py-1 px-2 text-sm rounded text-white bg-blue-600 float-right"
      >
        <i class="fa fa-pencil-alt"></i>
      </button>
    </div>
    <div v-show="showForm">
      <div
        class="text-white text-center font-bold p-4 mb-4"
        v-if="show_alert"
        :class="alert_variant"
      >
        {{ alert_message }}
      </div>
      <vee-form @submit="edit" :validation-schema="songSchema" :initial-values="song">
        <div class="mb-3">
          <label class="inline-block mb-2">{{ song.modified_name }}</label>
          <vee-field
            type="text"
            name="modified_name"
            class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
            placeholder="Enter Song Title"
          />
          <ErrorMessage class="text-red-600" name="modified_name" />
        </div>
        <div class="mb-3">
          <label class="inline-block mb-2">{{ song.genre }}</label>
          <vee-field
            name="genre"
            type="text"
            class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
            placeholder="Enter Genre"
          />
          <ErrorMessage class="text-red-600" name="genre" />
        </div>
        <div class="space-x-4">
          <button
            :disabled="in_submission"
            type="submit"
            class="py-1.5 px-3 rounded text-white bg-green-600"
          >
            Submit
          </button>
          <button
            :disabled="in_submission"
            type="button"
            @click.prevent="showForm = false"
            class="py-1.5 px-3 rounded text-white bg-gray-600"
          >
            Go Back
          </button>
        </div>
      </vee-form>
    </div>
  </div>
</template>
<script>
import { songsCollection } from '@/includes/firebase';

export default {
  name: 'CompositionItem',
  data() {
    return {
      showForm: false,
      songSchema: {
        modified_name: 'required',
        genre: 'alpha_spaces'
      },
      in_submission: false,
      show_alert: false,
      alert_variant: 'bg-blue-500',
      alert_message: 'Please wait! updating song info.'
    };
  },
  props: {
    song: {
      type: Object,
      required: true
    },
    updateSong: {
      type: Function,
      required: true
    },
    index: { type: Number, required: true }
  },
  methods: {
    async edit(values) {
      this.in_submission = true;
      this.show_alert = true;
      this.alert_variant = 'bg-blue-500';
      this.alert_message = 'Please wait! updating song info.';
      try {
        await songsCollection.doc(this.song.docID).update(values);
      } catch (error) {
        this.in_submission = true;
        this.alert_variant = 'bg-red-500';
        this.alert_message = 'something went wrong! try again later.';
        return;
      }
      this.updateSong(this.index, values);
      this.showForm = false;
      this.in_submission = false;
      this.alert_variant = 'bg-green-500';
      this.alert_message = 'successfully modified.';
    }
  }
};
</script>
