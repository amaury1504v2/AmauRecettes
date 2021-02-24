import React, { Component } from 'react'

const withPlaceholder = WrappedComponent => (props) => (
    <WrappedComponent placeholder="mon HOC"
    { ...props }
    />
)

export default withPlaceholder