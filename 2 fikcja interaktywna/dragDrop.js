(function (argument) {

	function forEachElements (elemnts, callback) {
		[].forEach.call(elemnts, callback);
	}

	var itemBoxes = document.querySelectorAll('.inventory-box');
	forEachElements(itemBoxes, function(itemBox) {
		itemBox.addEventListener('dragstart', hadleDragStart);
		itemBox.addEventListener('dragover', handleDragOver);
		itemBox.addEventListener('drop', handleDrop);
	});

	var draggingObject;
	function handleDragStart (event) {
		draggingObject = this;
		event.dataTransfer.setData('text/html', this.innerHTML);
		var dragIcon = document.createElement('img'),
			imageName = this.firstChild.id;
		dragIcon.src = imageName + '.png';
		event.dataTransfer.setDragImage(dragIcon, -10, 10);
	}

	function handleDragOver (event) {
		event.preventDefault();
	}

	function handleDrop (event) {
		var dragAppliedTo = this;
		game.things.dropItemInto(draggingObject, dragAppliedTo.parentElement.parentElement.id);
		event.preventDefault();
	}

	var inventoryObject = (function() {
		var inventory = {},
			itemables = document.getElementsByClassName("itemable"),
			items = document.getElementsByClassName("item");

		forEachElements(itemables, function(itemable) {
			inventory[itemable.id] = [];
		});

		forEachElements(items, function(item) {
			var greatGrandPa = item.parentElement.parentElement.parentElement;
			inventory[greatGrandPa.id].push(item.id);
		});

		var add = function (inventorySection, newItem) {
				inventory[inventorySection].push(newItem);
				return inventory;
			},

			remove = function (inventorySection, itemToDelete) {
				for (var i = 0; i < inventory[inventorySection].length; i++) {
					inventory[inventorySection].splice(i, 1);
				}
				return inventory;
			};

			return {
				get: function () {
					return inventory;
				},
				add: add,
				remove: remove
			};
	})();

})();

