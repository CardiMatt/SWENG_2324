<template>
    <div class="card h-100">
      <img :src="story.image" class="card-img-top" :alt="story.title" />
      <div class="card-body">
        <h5 class="card-title">{{ story.title }}</h5>
        <p class="card-text">{{ story.description }}</p>
        <p class="text-muted">Autore: {{ story.author }}</p>
        <p class="text-muted">Genere: {{ story.genre }}</p>
        <button class="btn btn-primary" @click="isEditing = true">Modifica dettagli storia</button>
        <button class="btn btn-primary" @click="showStoryScenarios">Modifica contenuti</button>
      </div>
    </div>

    <CreateStory v-if="isEditing" :existingStory="story" @close="isEditing = false" />

      <!-- Mostra gli scenari della storia -->
  <BrowseCreatedStoryScenarios 
    v-if="isViewingScenarios" 
    :storyTitle="'CuoreDiLuce'" 
    @close="isViewingScenarios = false" 
  />
</template>
  
<script>
    import { defineComponent, ref } from 'vue';
    import CreateStory from './CreateStory.vue';
    import BrowseCreatedStoryScenarios from './BrowseCreatedStoryScenarios.vue';

    export default defineComponent({
    name: 'BrowseCreatedStoryCard',
    components: { CreateStory,  BrowseCreatedStoryScenarios},
    props: {
        story: {
        type: Object,
        required: true,
        },
    },
    setup() {
        const isEditing = ref(false); // 🔹 Controlla la visibilità di CreateStory
        const isViewingScenarios = ref(false); // Mostra contenuti della storia

        const showStoryScenarios = () => {
      isViewingScenarios.value = true;
    };

        return { isEditing, isViewingScenarios, showStoryScenarios  };
    },
    methods: {
        // modifyStory() {
        //     //<CreateStory :existingStory="storyDaModificare" />

        //     // if (typeof window.typeMessage === 'function') {
        //     // window.typeMessage(this.story.id, true, true);
        //     // window.unmountVueComponentsInExtention("BrowseCreatedStory");
        //     // } else {
        //     // console.error('window.typeMessage non è definita');
        //     // }
        // },
        modifyMemory(){
            //window.typeMessage("");
        }
    },
    });
</script>

<style scoped>
    .card {
    border: 1px solid #ddd;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
    }

    .card:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
    }
    .card-img-top {
    height: 200px;
    object-fit: cover;
    }
</style>
