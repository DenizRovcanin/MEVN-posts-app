import Vue from 'vue';
import Posts from '@/components/Posts';

describe('Posts.vue', () => {
  it('should render correct contents', () => {
    const Constructor = Vue.extend(Posts);
    const vm = new Constructor().$mount();
    expect(vm.$el.querySelector('.posts h1').textContent)
      .to.equal('Posts');
  });
});
