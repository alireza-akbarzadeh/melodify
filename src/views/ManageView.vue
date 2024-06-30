<template>
  <!-- Main Content -->
  <section class="container mx-auto mt-6">
    <div class="md:grid md:grid-cols-3 md:gap-4">
      <div class="col-span-1">
        <upload-files />
      </div>
      <div class="col-span-2">
        <div class="bg-white rounded border border-gray-200 relative flex flex-col">
          <div class="px-6 pt-6 pb-5 font-bold border-b border-gray-200">
            <span class="card-title">My Songs</span>
            <i class="fa fa-compact-disc float-right text-green-400 text-2xl"></i>
          </div>
          <div class="p-6">
            <!-- Composition Items -->
            <composition-item
              v-for="(song, index) in songs"
              :song="song"
              :key="song.docID"
              :index="index"
              :updateSong="updateSong"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import UploadFiles from '@/components/UploadFiles.vue';
import CompositionItem from '@/components/CompositionItem.vue';
import { auth, songsCollection } from '@/includes/firebase';
export default {
  name: 'ManageView',
  components: { UploadFiles, CompositionItem },
  data() {
    return {
      songs: []
    };
  },
  async created() {
    const userId = auth.currentUser.uid;
    const snapshop = await songsCollection.where('uid', '==', userId).get();
    snapshop.forEach((document) => {
      const song = { ...document.data(), docID: document.id };
      this.songs.push(song);
    });
  },
  methods: {
    updateSong(i, valuse) {
      this.songs[i].modified_name = valuse.modified_name;
      this.songs[i].genre = valuse.genre;
    }
  }
};
</script>
