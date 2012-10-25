# Getting Started

`npm install`
`cd public && bower install`
`cd .. && grunt dev`

# About

This is a work in progress POC of a mixture of idealogies regarding how a
Single Page Application should be structured. I am using Backbone for the MV*
part of the app as well as utilizing Backbone.Events for the event architecture
and mediator. RequireJS is used for AMD. The application has been designed so
that multiple applications can run simultaneously. Widgets are essentially stand
alone applications that can be started and stopped. Routing/linkability is to
be implemented as a Widget to prevent loose coupling of links and state. States
are to be used to control application state opposed to Routes. This does not
seem like the popular way currently, but seems to make more sense to me as I have
had state tied to routing in the past and it was disasterous.

# Influences

I mentioned this POC has serval influences briefly. The idea of widgets is based
heavily on [Aura](http://addyosmani.github.com/aura/). The principals of being
able to start and stop a widget are the same, but the implementation is very
different. I also draw from the work of [Marionette](http://marionettejs.com/)
and the writings of Derick Baily regarding View cleanup and killing of zombies.

