<template>
    <div class="slider" :data-name="name"></div>
</template>

<script>
import nouislider from 'nouislider'
import wnumb from 'wnumb'
import 'nouislider/distribute/nouislider.css';

export default {
  props: {
    name: {
      type: String,
      default: null
    }
  },
  data: function () {
    return {
      instance: undefined
    }
  },
  mounted: function () {
    console.log(this.name);
    var sliders = document.getElementsByClassName('slider');
    [].slice.call(sliders).forEach(slider => {
        
        nouislider.create(slider, {
            range: {
                'min': 0,
                'max': 1
            },
            start: [0.1, 0.8],
            margin: 0.1,
            connect: true,
            tooltips: true,
            format: wnumb({
                decimals: 2
            }),
        });
        slider.noUiSlider.on('change', async () => {
          let val = await slider.noUiSlider.get();
          this.$store.dispatch('setRange', {name: slider.getAttribute('data-name'),val: val})
            // slider.noUiSlider.get()
            // console.log(slider.noUiSlider.get());
            // console.log(slider.getAttribute('data-name'));
        });

    });
  }
}
</script>

<style>
</style>