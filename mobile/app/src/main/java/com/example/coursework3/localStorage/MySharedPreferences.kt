import android.content.Context
import android.content.SharedPreferences
import com.example.coursework3.data.LoginResponse

class MySharedPreferences(context: Context) {
    private val sharedPreferences: SharedPreferences = context.getSharedPreferences("MyPrefs", Context.MODE_PRIVATE)
    private val editor: SharedPreferences.Editor = sharedPreferences.edit()


    fun saveUserId(userId: String) {
        editor.putString("userId", userId)
        editor.apply()
    }

    fun getUserId(): String? {
        return sharedPreferences.getString("userId", null)
    }

    fun clearJwt() {
        editor.remove("jwt")
        editor.apply()
    }

    fun savePageId(pageId: Int) {
        editor.putInt("pageId", pageId)
        editor.apply()
    }

    fun getPageId(): Int? {
        return sharedPreferences.getInt("pageId", 0)
    }

    fun clearPageId() {
        editor.remove("pageId")
        editor.apply()
    }
}
