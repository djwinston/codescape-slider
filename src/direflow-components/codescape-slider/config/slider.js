export const SLIDER_CONFIG = {
  containerProps: {
    style: {
      width: '100%',
      justifyContent: 'space-between',
    },
  },
  forwardBtnProps: {
    children: '>',
    style: {
      width: 60,
      height: 60,
      minWidth: 60,
      alignSelf: 'center',
    },
    className: 'button is-info',
  },
  backwardBtnProps: {
    children: '<',
    style: {
      width: 60,
      height: 60,
      minWidth: 60,
      alignSelf: 'center',
    },
    className: 'button is-info',
  },
  responsive: [{minWidth: 768, maxWidth: 992, itemsToShow: 3}, {maxWidth: 767, itemsToShow: 1}]
}