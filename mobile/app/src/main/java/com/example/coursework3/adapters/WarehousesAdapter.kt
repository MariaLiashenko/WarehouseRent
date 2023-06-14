package com.example.coursework3.adapters

//import MySharedPreferences
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Button
import android.widget.ImageView
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView
import com.example.coursework3.R
import com.example.coursework3.data.Warehouse
import com.squareup.picasso.Picasso
//import java.text.SimpleDateFormat
//import java.util.Locale

class WarehousesAdapter(private val userId: String) :
    RecyclerView.Adapter<WarehousesAdapter.WarehouseViewHolder>() {
        private val warehouses: MutableList<Warehouse> = mutableListOf()
//        private val dateFormat = SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'", Locale.getDefault())

    fun setWarehouses(warehouses: List<Warehouse>) {
        this.warehouses.clear()
        this.warehouses.addAll(warehouses)
//        println(this.warehouses[1])
        println(this.getItemCount())

        notifyDataSetChanged()
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): WarehouseViewHolder {
        val view =
            LayoutInflater.from(parent.context).inflate(R.layout.item_warehouse, parent, false)
        println(view)
        return WarehouseViewHolder(view)
    }

    override fun onBindViewHolder(holder: WarehouseViewHolder, position: Int) {
//        println(position)
        val warehouse = warehouses[position]
        holder.bind(warehouse)


    }

    override fun getItemCount(): Int {



        return warehouses.size
    }

    inner class WarehouseViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView) {
        private val nameTextView: TextView = itemView.findViewById(R.id.nameTextView)
        private val cityTextView: TextView = itemView.findViewById(R.id.cityTextView)
        private val addressTextView: TextView = itemView.findViewById(R.id.addressTextView)
        private val priceMonthTextView: TextView = itemView.findViewById(R.id.priceMonthTextView)
        private val priceYearTextView: TextView = itemView.findViewById(R.id.priceYearTextView)
        private val imageView: ImageView = itemView.findViewById(R.id.imageViewWarehouse)


//        private lateinit var sharedPreferences: MySharedPreferences

        fun bind(warehouse: Warehouse) {
            if(warehouse.photos.size != 0 ) {
            val imageUrl = warehouse.photos[0]
            Picasso.get().load(imageUrl).into(imageView)
            }
            nameTextView.text = "name: "+warehouse.en.name
            cityTextView.text = "city: "+warehouse.en.city
            addressTextView.text = "address: "+ warehouse.en.adress
            priceMonthTextView.text = "price month: "+ warehouse.priceMonth.toString()
            priceYearTextView.text = "price month: "+ warehouse.priceYear.toString()
            println(warehouse)

        }
    }

}
