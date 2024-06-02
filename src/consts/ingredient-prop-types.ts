import PropTypes from 'prop-types'

export default PropTypes.shape({
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    image_large: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    customId: PropTypes.string
})